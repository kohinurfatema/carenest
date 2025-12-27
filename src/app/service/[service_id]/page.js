import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceById, getAllServiceIds } from "@/data/services";
import { CheckCircle, Clock, Calendar, ArrowLeft } from "lucide-react";

// Generate static params for all services
export async function generateStaticParams() {
  const ids = getAllServiceIds();
  return ids.map((id) => ({
    service_id: id,
  }));
}

// Dynamic metadata
export async function generateMetadata({ params }) {
  const { service_id } = await params;
  const service = getServiceById(service_id);

  if (!service) {
    return {
      title: "Service Not Found - CareNest",
    };
  }

  return {
    title: `${service.name} - CareNest`,
    description: service.description,
  };
}

export default async function ServiceDetail({ params }) {
  const { service_id } = await params;
  const service = getServiceById(service_id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Image */}
      <div
        className="h-72 md:h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${service.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 flex flex-col justify-end p-8">
          <div className="container mx-auto">
            <Link href="/#services" className="btn btn-sm btn-ghost text-white mb-4">
              <ArrowLeft size={16} />
              Back to Services
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {service.name}
            </h1>
            <p className="text-white/80 mt-2 max-w-2xl">{service.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-2xl">About This Service</h2>
                <p className="text-base-content/70 leading-relaxed">
                  {service.longDescription}
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-xl">What&apos;s Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-success mt-0.5 flex-shrink-0" size={20} />
                      <span className="text-base-content/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-24">
              <div className="card-body">
                <h3 className="card-title text-xl">Pricing</h3>
                <div className="divider my-2"></div>

                <div className="space-y-4">
                  {/* Hourly Rate */}
                  <div className="bg-primary/10 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <Clock className="text-primary" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-base-content/60">Hourly Rate</p>
                        <p className="text-2xl font-bold text-primary">
                          {service.pricePerHour} <span className="text-sm font-normal">BDT/hour</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Daily Rate */}
                  <div className="bg-secondary/10 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary/20 p-3 rounded-full">
                        <Calendar className="text-secondary" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-base-content/60">Daily Rate</p>
                        <p className="text-2xl font-bold text-secondary">
                          {service.pricePerDay} <span className="text-sm font-normal">BDT/day</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="divider my-2"></div>

                <Link
                  href={`/booking/${service.id}`}
                  className="btn btn-primary btn-block btn-lg"
                >
                  Book Now
                </Link>

                <p className="text-center text-sm text-base-content/60 mt-3">
                  No payment required until service is confirmed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
