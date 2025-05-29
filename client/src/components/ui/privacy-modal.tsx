import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useI18n } from "@/hooks/use-i18n";

interface PrivacyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyModal({ open, onOpenChange }: PrivacyModalProps) {
  const { t } = useI18n();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-black border-gray-600 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
            {t("privacy.title")}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 text-gray-300">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">
                {t("privacy.section1.title")}
              </h4>
              <p className="mb-4">
                {t("privacy.section1.content")}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-3">
                {t("privacy.section2.title")}
              </h4>
              <p className="mb-4">
                {t("privacy.section2.content")}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-3">
                {t("privacy.section3.title")}
              </h4>
              <p className="mb-4">
                {t("privacy.section3.content")}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-3">
                {t("privacy.section4.title")}
              </h4>
              <p className="mb-4">
                {t("privacy.section4.content")}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-3">
                {t("privacy.section5.title")}
              </h4>
              <p>
                {t("privacy.section5.content")}
              </p>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-end pt-4 border-t border-gray-700">
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {t("privacy.close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
