import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/use-i18n";
import { PrivacyModal } from "@/components/ui/privacy-modal";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle } from "lucide-react";
import { WhyDataModal } from "@/components/ui/WhyDataModal";

export function Registration() {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [whyDataModalOpen, setWhyDataModalOpen] = useState(false);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      email: "",
      twitchUsername: "",
      followersRange: undefined as any,
      streamingDuration: "",
      streamingSoftware: undefined as any,
      language: language,
    },
  });

  // Vérifie si tous les champs sont remplis
  const isFormValid =
    privacyChecked &&
    form.watch("email") &&
    form.watch("twitchUsername") &&
    form.watch("followersRange") &&
    form.watch("streamingDuration") &&
    form.watch("streamingSoftware");

  const mutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: () => {
      setSuccess(true);
      form.reset();
      toast({
        title: "Success!",
        description: t("register.success"),
      });
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertLead) => {
    mutation.mutate({ ...data, language });
  };

  if (success) {
    return (
      <section id="register" className="py-20 bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-slate-700 border-green-500/20">
            <CardContent className="p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                {t("register.success")}
              </h2>
              <p className="text-gray-300 mb-6">{t("register.success2")}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent text-center">
            {t("register.title")}
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t("register.subtitle")}
          </p>
          <p className="text-base text-gray-400 max-w-2xl mx-auto mt-2">
            {t("register.subtitle2")}
          </p>
        </div>
        <Card className="bg-black border-gray-600">
          <CardContent className="p-8 lg:p-12">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    {t("register.email.label")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("register.email.placeholder")}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    {...form.register("email", { required: true })}
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-sm">
                      {t("register.email.error")}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitchUsername" className="text-gray-300">
                    {t("register.twitch.label")}
                  </Label>
                  <Input
                    id="twitchUsername"
                    type="text"
                    placeholder={t("register.twitch.placeholder")}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    {...form.register("twitchUsername", { required: true })}
                  />
                  {form.formState.errors.twitchUsername && (
                    <p className="text-red-400 text-sm">
                      {t("register.twitch.error")}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre de followers */}
                <div className="space-y-2">
                  <Label htmlFor="followers" className="text-gray-300">
                    {t("register.followers.label")}
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("followersRange", value as any)
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue
                        placeholder={t("register.followers.select")}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem
                        value="0-50"
                        className="text-white hover:bg-gray-700"
                      >
                        {t("register.followers.range1")}
                      </SelectItem>
                      <SelectItem
                        value="51-500"
                        className="text-white hover:bg-gray-700"
                      >
                        {t("register.followers.range2")}
                      </SelectItem>
                      <SelectItem
                        value="501-5000"
                        className="text-white hover:bg-gray-700"
                      >
                        {t("register.followers.range3")}
                      </SelectItem>
                      <SelectItem
                        value="5001-50000"
                        className="text-white hover:bg-gray-700"
                      >
                        {t("register.followers.range4")}
                      </SelectItem>
                      <SelectItem
                        value="50000+"
                        className="text-white hover:bg-gray-700"
                      >
                        {t("register.followers.range5")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.followersRange && (
                    <p className="text-red-400 text-sm">
                      {t("register.followers.error")}
                    </p>
                  )}
                </div>
                {/* Durée de streaming */}
                <div className="space-y-2">
                  <Label htmlFor="streamingDuration" className="text-gray-300">
                    {t("register.streamingDuration.label")}
                  </Label>
                  <Input
                    id="streamingDuration"
                    type="text"
                    placeholder={t("register.streamingDuration.placeholder")}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    {...form.register("streamingDuration", { required: true })}
                  />
                  {form.formState.errors.streamingDuration && (
                    <p className="text-red-400 text-sm">
                      {t("register.streamingSoftware.error")}
                    </p>
                  )}
                </div>
              </div>

              {/* Streaming Platform & Language */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Streaming Platform */}
                <div className="flex-1 space-y-2">
                  <Label htmlFor="streamingSoftware" className="text-gray-300">
                    {t("register.streamingSoftware.label")}
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("streamingSoftware", value as any)
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue
                        placeholder={t("register.streamingSoftware.option")}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem
                        value="obs"
                        className="text-white hover:bg-gray-700"
                      >
                        OBS
                      </SelectItem>
                      <SelectItem
                        value="streamlabs"
                        className="text-white hover:bg-gray-700"
                      >
                        Streamlabs
                      </SelectItem>
                      <SelectItem
                        value="autre"
                        className="text-white hover:bg-gray-700"
                      >
                        {t("register.streamingSoftware.autre")}
                      </SelectItem>
                      <SelectItem
                        value="nostream"
                        className="text-white hover:bg-gray-700"
                      >
                        {t("register.streamingSoftware.nostream")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.streamingSoftware && (
                    <p className="text-red-400 text-sm">
                      {t("register.streamingDuration.error")}
                    </p>
                  )}
                </div>
                {/* Language Select */}
                <div className="flex-1 space-y-2">
                  <Label htmlFor="userLanguage" className="text-gray-300">
                    {t("register.language.label")}
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("language", value as any)
                    }
                    defaultValue={form.watch("language") || language}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Choisissez une langue" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem
                        value="fr"
                        className="text-white hover:bg-gray-700"
                      >
                        {t("register.language.fr")}
                      </SelectItem>
                      <SelectItem
                        value="en"
                        className="text-white hover:bg-gray-700"
                      >
                        {t("register.language.en")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Conditions */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy"
                  checked={privacyChecked}
                  onCheckedChange={(checked) =>
                    setPrivacyChecked(checked === true)
                  }
                  className="mt-1 border-gray-600 data-[state=checked]:bg-blue-600"
                />
                <Label
                  htmlFor="privacy"
                  className="text-sm text-gray-300 flex-1"
                >
                  {t("register.privacy.label")}{" "}
                  <button
                    type="button"
                    onClick={() => setPrivacyModalOpen(true)}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    {t("register.privacy.link")}
                  </button>{" "}
                  {t("register.privacy.required")}
                </Label>
              </div>
              {/* Why we collect data */}
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setWhyDataModalOpen(true)}
                  className="text-blue-400 hover:text-blue-300 underline text-sm"
                >
                  {t("register.whydata.button")}
                </button>
              </div>
              <WhyDataModal
                open={whyDataModalOpen}
                onOpenChange={setWhyDataModalOpen}
                text={t("register.whydata.content")}
              />
              <Button
                type="submit"
                disabled={mutation.isPending || !isFormValid}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-800 hover:to-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending
                  ? t("register.submitting")
                  : t("register.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <PrivacyModal
        open={privacyModalOpen}
        onOpenChange={setPrivacyModalOpen}
      />
    </section>
  );
}
