import { useI18n } from "@/hooks/use-i18n";

export function HowItWorks() {
  const { t } = useI18n();

  const steps = [
    {
      number: "1",
      title: t("how-it-works.step1.title"),
      description: t("how-it-works.step1.description"),
      gradient: "from-blue-500 to-purple-500",
    },
    {
      number: "2",
      title: t("how-it-works.step2.title"),
      description: t("how-it-works.step2.description"),
      gradient: "from-purple-500 to-cyan-500",
    },
    {
      number: "3",
      title: t("how-it-works.step3.title"),
      description: t("how-it-works.step3.description"),
      gradient: "from-cyan-500 to-teal-500",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
            {t("how-it-works.title")}
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t("how-it-works.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white`}
              >
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {step.title}
              </h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
