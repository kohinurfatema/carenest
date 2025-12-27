import Link from "next/link";
import { Baby, Heart, Stethoscope } from "lucide-react";

const ServicesOverview = () => {
  const services = [
    {
      id: "baby-care",
      name: "Baby Care",
      description:
        "Professional babysitting services for your little ones. Our trained caregivers ensure a safe and nurturing environment.",
      icon: <Baby size={48} />,
      pricePerHour: 200,
      pricePerDay: 1500,
      color: "text-pink-500",
      bgColor: "bg-pink-100",
    },
    {
      id: "elderly-care",
      name: "Elderly Care",
      description:
        "Compassionate care for your elderly family members. We provide companionship, medical assistance, and mobility support.",
      icon: <Heart size={48} />,
      pricePerHour: 250,
      pricePerDay: 2000,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      id: "sick-care",
      name: "Sick People Care",
      description:
        "Specialized care for sick individuals at home. Our caregivers assist with medication, health monitoring, and recovery.",
      icon: <Stethoscope size={48} />,
      pricePerHour: 300,
      pricePerDay: 2500,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <section id="services" className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            We offer a range of caregiving services tailored to meet your
            family&apos;s unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="card-body">
                <div
                  className={`w-20 h-20 rounded-full ${service.bgColor} ${service.color} flex items-center justify-center mb-4 mx-auto`}
                >
                  {service.icon}
                </div>
                <h3 className="card-title justify-center text-xl">
                  {service.name}
                </h3>
                <p className="text-center text-base-content/70">
                  {service.description}
                </p>
                <div className="divider"></div>
                <div className="flex justify-between text-sm">
                  <span>
                    <strong>{service.pricePerHour} BDT</strong>/hour
                  </span>
                  <span>
                    <strong>{service.pricePerDay} BDT</strong>/day
                  </span>
                </div>
                <div className="card-actions justify-center mt-4">
                  <Link
                    href={`/service/${service.id}`}
                    className="btn btn-primary btn-block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
