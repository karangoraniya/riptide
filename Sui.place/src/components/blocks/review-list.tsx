"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
}

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewListComponent({ reviews }: ReviewListProps) {
  return (
    <div className="grid gap-6">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="flex items-start space-x-4 pt-6">
            <Avatar>
              <AvatarImage src={review.avatar} alt={review.user} />
              <AvatarFallback>{review.user.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{review.user}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mt-2">{review.comment}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
