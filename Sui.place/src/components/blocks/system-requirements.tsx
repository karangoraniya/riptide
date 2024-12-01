"use client";

import { Card, CardContent } from "@/components/ui/card";

interface SystemRequirementsProps {
  requirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export default function SystemRequirementsComponent({
  requirements,
}: SystemRequirementsProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <dt className="font-semibold">OS</dt>
            <dd className="text-muted-foreground">{requirements.os}</dd>
          </div>
          <div>
            <dt className="font-semibold">Processor</dt>
            <dd className="text-muted-foreground">{requirements.processor}</dd>
          </div>
          <div>
            <dt className="font-semibold">Memory</dt>
            <dd className="text-muted-foreground">{requirements.memory}</dd>
          </div>
          <div>
            <dt className="font-semibold">Graphics</dt>
            <dd className="text-muted-foreground">{requirements.graphics}</dd>
          </div>
          <div>
            <dt className="font-semibold">Storage</dt>
            <dd className="text-muted-foreground">{requirements.storage}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
