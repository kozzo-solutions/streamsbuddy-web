import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useI18n } from "@/hooks/use-i18n";

export function WhyDataModal({
  open,
  onOpenChange,
  text,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  text: string;
}) {
  const { t, language } = useI18n();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("register.whydata.title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{t("register.whydata.content")}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
