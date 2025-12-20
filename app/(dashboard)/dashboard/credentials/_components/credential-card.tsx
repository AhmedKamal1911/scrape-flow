import { Card, CardAction } from "@/components/ui/card";
import { KeyRound } from "lucide-react";
import DeleteCredentialDialog from "./delete-credential-dialog";
import { formatDistanceToNow } from "date-fns";
import { Credential } from "@prisma/client";

export function CredentialCard({
  credentialInfo,
}: {
  credentialInfo: Credential;
}) {
  const createdAt = formatDistanceToNow(credentialInfo.createdAt, {
    addSuffix: true,
  });
  return (
    <Card className="w-full p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-sm bg-primary/10 size-8 flex items-center justify-center">
            <KeyRound size={18} className="stroke-primary" />
          </div>
          <div>
            <span className="font-bold">{credentialInfo.name}</span>
            <p className="text-xs text-muted-foreground">{createdAt}</p>
          </div>
        </div>
        <CardAction>
          <DeleteCredentialDialog credentialName={credentialInfo.name} />
        </CardAction>
      </div>
    </Card>
  );
}
