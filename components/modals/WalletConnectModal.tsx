import { ConnectIcon } from "@/components/icons/ConnectIcon";
import { WalletList } from "@/components/ui/wallets-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { Button } from "@/ui/button";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/ui/credenza";
import { ScrollArea } from "@/ui/scroll-area";
import { WalletName } from "@solana/wallet-adapter-base";
import { Wallet } from "@solana/wallet-adapter-react";
import { AnimationControls } from "framer-motion";
import { BadgeInfo } from "lucide-react";

type WalletConnectModalProps = {
  controls: AnimationControls;
  installedWallets: Wallet[];
  uninstalledWallets: Wallet[];
  onConnect: (name: WalletName) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isConnecting: boolean;
};

export const WalletConnectModal = ({
  controls,
  installedWallets,
  uninstalledWallets,
  onConnect,
  open,
  onOpenChange,
  isConnecting,
}: WalletConnectModalProps) => (
  <Credenza open={open} onOpenChange={onOpenChange}>
    <CredenzaTrigger asChild>
      <Button
        disabled={isConnecting}
        className="h-fit gap-2 rounded-full bg-primary font-semibold text-background hover:bg-foreground"
        onMouseEnter={() => controls.start("animate")}
        onMouseLeave={() => controls.start("normal")}
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
        <ConnectIcon controls={controls} />
      </Button>
    </CredenzaTrigger>
    <CredenzaContent className="h-fit gap-0 border bg-background p-0">
      <CredenzaHeader className="border-b p-5">
        <CredenzaTitle className="font-semibold text-foreground">
          Connect Wallet
        </CredenzaTitle>
        <CredenzaDescription className="font-medium text-muted-foreground">
          You need to connect a Solana wallet.
        </CredenzaDescription>
      </CredenzaHeader>
      <div className="space-y-4 p-5">
        <h1 className="text-sm font-medium text-foreground">
          Installed Wallets
        </h1>
        <WalletList
          wallets={installedWallets}
          onSelect={onConnect}
          type="installed"
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="moreWallets" className="border-0">
            <AccordionTrigger className="normal text-sm font-medium text-foreground">
              More Wallets
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pb-0">
              <ScrollArea className="max-md:h-[250px]">
                <WalletList
                  wallets={uninstalledWallets}
                  onSelect={onConnect}
                  type="uninstalled"
                />
              </ScrollArea>
              <p className="flex items-center justify-center gap-2 py-3 text-xs text-foreground">
                <BadgeInfo className="size-4" />
                <span>
                  If you face errors, install the wallet before connecting.
                </span>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </CredenzaContent>
  </Credenza>
);
