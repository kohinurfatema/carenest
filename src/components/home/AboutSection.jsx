import { Users, Award, HeartHandshake, CheckCircle } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: <Users className="text-primary" size={32} />,
      title: "Expert Caregivers",
      description:
        "All our caregivers are trained professionals with verified backgrounds.",
    },
    {
      icon: <Award className="text-primary" size={32} />,
      title: "Quality Service",
      description:
        "We maintain high standards to ensure the best care for your family.",
    },
    {
      icon: <HeartHandshake className="text-primary" size={32} />,
      title: "Trusted Platform",
      description:
        "Thousands of families trust CareNest for their caregiving needs.",
    },
    {
      icon: <CheckCircle className="text-primary" size={32} />,
      title: "Easy Booking",
      description:
        "Simple and quick booking process to get care when you need it.",
    },
  ];

  return (
    <section id="about" className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose CareNest?</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            We are committed to providing the best caregiving services for your
            loved ones. Our platform connects you with verified and experienced
            caregivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-200 hover:shadow-lg transition-shadow"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="card-title text-lg">{feature.title}</h3>
                <p className="text-base-content/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
