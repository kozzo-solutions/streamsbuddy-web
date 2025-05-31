import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/hooks/use-i18n";
import { Brain, Gamepad2, Gauge, MicOff, Users, Volume2 } from "lucide-react";

export function Features() {
  const { t } = useI18n();

  const features = [
    {
      icon: <MicOff className="w-10 h-10" />,
      title: t("features.mic.title"),
      description: t("features.mic.description"),
      color: "text-blue-400 group-hover:text-blue-300",
    },
    {
      icon: <Brain className="w-10 h-10" />,
      title: t("features.assistant.title"),
      description: t("features.assistant.description"),
      color: "text-blue-400 group-hover:text-blue-300",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: t("features.viewers.title"),
      description: t("features.viewers.description"),
      color: "text-teal-400 group-hover:text-teal-300",
    },
    {
      icon: <Volume2 className="w-10 h-10" />,
      title: t("features.audio.title"),
      description: t("features.audio.description"),
      color: "text-cyan-400 group-hover:text-cyan-300",
    },
    {
      icon: <Gauge className="w-10 h-10" />,
      title: t("features.fps.title"),
      description: t("features.fps.description"),
      color: "text-purple-400 group-hover:text-purple-300",
    },
    {
      icon: <Gamepad2 className="w-10 h-10" />,
      title: t("features.game.title"),
      description: t("features.game.description"),
      color: "text-pink-400 group-hover:text-pink-300",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
            {t("features.title")}
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-black border-gray-700 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
            >
              <CardContent className="p-8">
                <div className={`${feature.color} mb-4`}>{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
