.PHONY: all deploy build publish

all:
	cd contract && ./deploy.sh all

deploy:
	cd contract && ./deploy.sh all

build:
	cd contract && ./deploy.sh build

publish:
	cd contract && ./deploy.sh publish
	
balance:
	cd contract && ./deploy.sh balance