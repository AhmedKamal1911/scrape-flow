import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PageHeader from "../_components/common/page-header";
import { KeyRound, ShieldPlus } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getCredentialsForUser } from "@/lib/server/queries/credentials/get-credentials-for-user";
import { Card } from "@/components/ui/card";

import CreateCredentialDialog from "./_components/create-credential-dialog";

import { CredentialCard } from "./_components/credential-card";

export default function CredentialsPage() {
  return (
    <div className="flex flex-col h-full gap-6">
      <PageHeader
        title="Credentials"
        description="Manage your credentials."
        // action={<CreateWorkflowDialog />}
      />

      <div className="h-full flex flex-col gap-16">
        <Alert>
          <ShieldPlus className="size-6 stroke-primary" />
          <AlertTitle className="text-primary font-bold">Encryption</AlertTitle>
          <AlertDescription>
            All information is securely encrypted, ensuring tour data remains
            safe
          </AlertDescription>
        </Alert>
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <UserCredentials />
        </Suspense>
      </div>
    </div>
  );
}
async function UserCredentials() {
  const credentials = await getCredentialsForUser();
  if (credentials.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center gap-3  text-center flex-1">
        <div className="rounded-full bg-muted p-3">
          <KeyRound className="size-6 text-primary" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-semibold">No credentials yet</h3>
          <p className="text-sm text-muted-foreground">
            You haven’t added any credentials yet. Create one to get started.
          </p>
        </div>

        <CreateCredentialDialog buttonText="create your first credential" />
      </Card>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {credentials.map((credential) => (
        <CredentialCard key={credential.id} credentialInfo={credential} />
      ))}
    </div>
  );
}
