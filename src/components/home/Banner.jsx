import Link from "next/link";
import { Heart, Shield, Clock } from "lucide-react";

const Banner = () => {
  return (
    <div
      className="hero min-h-[600px]"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2070)",
      }}
    >
      <div className="hero-overlay bg-opacity-70 bg-base-300"></div>
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold leading-tight">
            Trusted Care for Your{" "}
            <span className="text-primary">Loved Ones</span>
          </h1>
          <p className="py-6 text-lg">
            Find reliable and compassionate caregivers for your children,
            elderly parents, or sick family members. We make caregiving easy,
            secure, and accessible for everyone.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Shield className="text-primary" size={20} />
              <span>Verified Caregivers</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-primary" size={20} />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="text-primary" size={20} />
              <span>Compassionate Care</span>
            </div>
          </div>

          <Link href="#services" className="btn btn-primary btn-lg">
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
