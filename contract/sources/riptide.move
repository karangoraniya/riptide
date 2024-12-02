
module riptide::riptide;


        use sui::balance::{Self, Balance};
        use sui::coin::{Self, Coin};
        use std::string::{String, utf8};
        use sui::table::{Self, Table};
        use sui::event;
        use sui::clock::{Self, Clock};

        // One-time witness for initialization
        public struct RIPTIDE has drop {}

        /// Status of the game
        const STATUS_CREATED: u8 = 0;
        const STATUS_FUNDED: u8 = 1;
        const STATUS_COMPLETED: u8 = 3;
        const STATUS_CANCELLED: u8 = 4;


        // Time constants
        const GAME_DURATION: u64 = 86400000; // 24 hours in milliseconds
        
        
        // Errors 
        const E_NOT_AUTHORIZED: u64 = 0;
        const E_INVALID_STATE: u64 = 1;
        const E_INVALID_AMOUNT: u64 = 2;
        // const E_ALREADY_CLAIMED: u64 = 3;
        // const E_NOT_CONFIRMED_BY_BOTH: u64 = 4;
        // const E_GAME_EXPIRED: u64 = 5;
        const E_GAME_NOT_EXPIRED: u64 = 6;
        const E_INSUFFICIENT_BALANCE: u64 = 7;
        // const E_ALREADY_DEPOSITED: u64 = 8;1
        // const E_MUST_DEPOSIT_FULL_AMOUNT: u64 = 9;



        public struct TreasuryCap has key {
            id: UID
        }



        public struct PrivateRoom<phantom T> has key {
            id: UID,
            nft_collection: String,
            creator: address,
            username: String,
            game_name: String,
            created_time: u64,
            start_time: Option<u64>,
            amount: u64,
            status: u8,
            balance: Balance<T>
        }

        public struct TournamentRoom<phantom T> has key {
            id: UID,
            nft_collection: String,
            creator_a_username: String,
            creator_b_username: String,
            creator_a: address,
            creator_b: address,
            game_name: String,
            created_time: u64,
            start_time: Option<u64>,
            amount_team_a: u64,
            amount_team_b: u64,
            status: u8,
            balance: Balance<T>
        }


        public struct UserDeposit has store {
            username: String,
            amount: u64
        }

        // Events
        public struct GameCreated<phantom T> has copy, drop {
            game_id: address,
            creator: address,
            amount: u64,
            game_type: String
        }

        public struct GameFunded<phantom T> has copy, drop {
            game_id: address,
            funder: address,
            amount: u64
        }

        public struct TreasuryDeposit<phantom T> has copy, drop {
            depositor: address,
            username: String,
            amount: u64
        }


        public struct Treasury<phantom T> has key {
            id: UID,
            owner: address,
            balance: Balance<T>,
            user_deposits: Table<address, UserDeposit> 
        }


         fun init(_witness: RIPTIDE, ctx: &mut TxContext) {
            let sender = tx_context::sender(ctx);
            
            // Create the main treasury
            let treasury = Treasury {
                id: object::new(ctx),
                owner: sender,
                balance: balance::zero<sui::sui::SUI>(),
                user_deposits: table::new(ctx),
            };

            // Create and transfer treasury cap
            let cap = TreasuryCap {
                id: object::new(ctx)
            };

            transfer::share_object(treasury);
            transfer::transfer(cap, sender);
        }

        public entry fun create_private_room<T>(
            nft_collection: String,
            username: String,
            game_name: String,
            amount: u64,
            start_time: Option<u64>,
            clock: &Clock,
            ctx: &mut TxContext
        ) {
            let sender = tx_context::sender(ctx);
            let current_time = clock::timestamp_ms(clock);

            let private_room = PrivateRoom<T> {
                id: object::new(ctx),
                nft_collection,
                creator: sender,
                username,
                game_name,
                created_time: current_time,
                // start_time: option::none(),
                start_time,
                amount,
                status: STATUS_CREATED,
                balance: balance::zero()
            };

            event::emit(GameCreated<T> {
                game_id: object::uid_to_address(&private_room.id),
                creator: sender,
                amount,
                game_type: utf8(b"Private")
            });

            transfer::share_object(private_room);
        }

      public entry fun deposit_private_room<T>(
        room: &mut PrivateRoom<T>,
        treasury: &mut Treasury<T>,
        payment: Coin<T>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        assert!(room.status == STATUS_CREATED, E_INVALID_STATE);
        let amount = coin::value(&payment);
        assert!(amount == room.amount, E_INVALID_AMOUNT);

        // Add to treasury balance
        coin::put(&mut treasury.balance, payment);

        // Record in user_deposits
        if (!table::contains(&treasury.user_deposits, sender)) {
            table::add(&mut treasury.user_deposits, sender, UserDeposit {
                username: room.username,
                amount
            });
        } else {
            let user_deposit = table::borrow_mut(&mut treasury.user_deposits, sender);
            user_deposit.amount = user_deposit.amount + amount;
        };

        room.status = STATUS_FUNDED;

        event::emit(GameFunded<T> {
            game_id: object::uid_to_address(&room.id),
            funder: sender,
            amount
        });
    }



        public entry fun create_tournament_room<T>(
            nft_collection: String,
            creator_a_username: String,
            creator_b_username: String,
            creator_b: address,
            game_name: String,
            amount: u64,
            start_time: Option<u64>,
            clock: &Clock,
            ctx: &mut TxContext
        ) {
            let sender = tx_context::sender(ctx);
            let current_time = clock::timestamp_ms(clock);
            // let current_time = clock::timestamp_ms(clock);


            let tournament = TournamentRoom<T> {
                id: object::new(ctx),
                nft_collection,
                creator_a_username,
                creator_b_username,
                creator_a: sender,
                creator_b,
                game_name,
                created_time: current_time,
                start_time,
                // start_time: option::none(),
                amount_team_a: amount,
                amount_team_b: amount,
                status: STATUS_CREATED,
                balance: balance::zero()
            };

            event::emit(GameCreated<T> {
                game_id: object::uid_to_address(&tournament.id),
                creator: sender,
                amount: amount * 2,
                game_type: utf8(b"Tournament")
            });

            transfer::share_object(tournament);
        }


      public entry fun deposit_tournament<T>(
        tournament: &mut TournamentRoom<T>,
        treasury: &mut Treasury<T>,
        payment: Coin<T>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        assert!(tournament.status == STATUS_CREATED, E_INVALID_STATE);
        let amount = coin::value(&payment);

        // Verify correct team and amount
        if (sender == tournament.creator_a) {
            assert!(amount == tournament.amount_team_a, E_INVALID_AMOUNT);
        } else if (sender == tournament.creator_b) {
            assert!(amount == tournament.amount_team_b, E_INVALID_AMOUNT);
        } else {
            abort(E_NOT_AUTHORIZED)
        };

        // Add to treasury balance
        coin::put(&mut treasury.balance, payment);

        // Record in user_deposits with proper mutable reference
        if (!table::contains(&treasury.user_deposits, sender)) {
            let username = if (sender == tournament.creator_a) {
                tournament.creator_a_username
            } else {
                tournament.creator_b_username
            };
            table::add(&mut treasury.user_deposits, sender, UserDeposit {
                username,
                amount
            });
        } else {
            let user_deposit = table::borrow_mut(&mut treasury.user_deposits, sender);
            user_deposit.amount = user_deposit.amount + amount;
        };

        // Update tournament status
        if (sender == tournament.creator_b) {
            tournament.status = STATUS_FUNDED;
        };

        event::emit(GameFunded<T> {
            game_id: object::uid_to_address(&tournament.id),
            funder: sender,
            amount
        });
    }

        public entry fun refund_private<T>(
            room: &mut PrivateRoom<T>,
            clock: &Clock,
            ctx: &mut TxContext
        ) {
            let current_time = clock::timestamp_ms(clock);
            assert!(room.status != STATUS_COMPLETED, E_INVALID_STATE);
            assert!(current_time >= room.created_time + GAME_DURATION, E_GAME_NOT_EXPIRED);
            
            transfer::public_transfer(
                coin::from_balance(balance::withdraw_all(&mut room.balance), ctx),
                room.creator
            );
            room.status = STATUS_CANCELLED;
        }

        public entry fun refund_tournament<T>(
            tournament: &mut TournamentRoom<T>,
            clock: &Clock,
            ctx: &mut TxContext
        ) {
            let current_time = clock::timestamp_ms(clock);
            assert!(tournament.status != STATUS_COMPLETED, E_INVALID_STATE);
            assert!(current_time >= tournament.created_time + GAME_DURATION, E_GAME_NOT_EXPIRED);
            
            let mut balance = balance::withdraw_all(&mut tournament.balance);
            let refund_amount = balance::value(&balance) / 2;
            
            transfer::public_transfer(
                coin::from_balance(balance::split(&mut balance, refund_amount), ctx),
                tournament.creator_a
            );
            transfer::public_transfer(
                coin::from_balance(balance, ctx),
                tournament.creator_b
            );
            tournament.status = STATUS_CANCELLED;
        }
        


      public entry fun deposit_to_treasury<T>(
        treasury: &mut Treasury<T>,
        username: String,
        payment: Coin<T>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let amount = coin::value(&payment);

        // Add to treasury balance
        coin::put(&mut treasury.balance, payment);

        // Record in user_deposits with proper mutable reference
        if (!table::contains(&treasury.user_deposits, sender)) {
            table::add(&mut treasury.user_deposits, sender, UserDeposit {
                username,
                amount
            });
        } else {
            let user_deposit = table::borrow_mut(&mut treasury.user_deposits, sender);
            user_deposit.amount = user_deposit.amount + amount;
        };

        event::emit(TreasuryDeposit<T> {
            depositor: sender,
            username,
            amount
        });
    }


        public entry fun withdraw_treasury<T>(
            treasury: &mut Treasury<T>,
            _cap: &TreasuryCap,
            amount: u64,
            receiver: address,
            ctx: &mut TxContext
        ) {
            let sender = tx_context::sender(ctx);
            // Only owner with cap can withdraw
            assert!(sender == treasury.owner, E_NOT_AUTHORIZED);
            assert!(balance::value(&treasury.balance) >= amount, E_INSUFFICIENT_BALANCE);

            let withdraw_coin = coin::from_balance(
                balance::split(&mut treasury.balance, amount),
                ctx
            );
            transfer::public_transfer(withdraw_coin, receiver);
        }
        