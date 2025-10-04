import Image from "next/image";
import { Heart, Shield, Award, Users, Leaf, Truck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <Image
                src="/logo.png"
                alt="Opaw Cat Food"
                width={200}
                height={60}
                className="h-16 w-auto logo-transparent"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About Opaw Cat Food
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're passionate about providing the highest quality nutrition for your beloved feline friends. 
              Every recipe is crafted with love, care, and the finest natural ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2024, Opaw Cat Food began with a simple mission: to create the most nutritious, 
                  delicious, and natural cat food that pet owners can trust. Our journey started when our 
                  founder's own cat, Whiskers, developed health issues due to poor-quality commercial food.
                </p>
                <p>
                  After extensive research and working with veterinarians, we developed our first recipe 
                  using only premium, natural ingredients. The results were remarkable - Whiskers' health 
                  improved dramatically, and we knew we had to share this with other cat lovers.
                </p>
                <p>
                  Today, we're proud to serve thousands of happy cats and their families across the country, 
                  providing nutrition that supports their health, vitality, and happiness.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg flex items-center justify-center">
                <span className="text-9xl">🐱</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center opaw-shadow opaw-hover">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Love & Care</h3>
              <p className="text-gray-600">
                Every recipe is crafted with genuine love for cats and their well-being. 
                We treat every pet as if they were our own.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center opaw-shadow opaw-hover">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Ingredients</h3>
              <p className="text-gray-600">
                We use only the finest natural ingredients, free from artificial preservatives, 
                colors, and flavors that can harm your cat's health.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center opaw-shadow opaw-hover">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Every batch is rigorously tested and approved by veterinarians to ensure 
                the highest standards of nutrition and safety.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center opaw-shadow opaw-hover">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We're committed to continuous improvement and innovation in pet nutrition, 
                always striving to exceed expectations.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center opaw-shadow opaw-hover">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in building a community of cat lovers who share our passion 
                for providing the best care for their feline friends.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center opaw-shadow opaw-hover">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Convenience</h3>
              <p className="text-gray-600">
                We make it easy for you to provide the best nutrition for your cat with 
                convenient delivery and excellent customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The passionate people behind Opaw Cat Food</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="aspect-square bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center mx-auto mb-4 w-32 h-32">
                <span className="text-4xl">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dr. Sarah Johnson</h3>
              <p className="text-orange-600 font-medium mb-2">Chief Veterinarian</p>
              <p className="text-gray-600">
                With over 15 years of experience in feline nutrition, Dr. Johnson ensures 
                every recipe meets the highest nutritional standards.
              </p>
            </div>

            <div className="text-center">
              <div className="aspect-square bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center mx-auto mb-4 w-32 h-32">
                <span className="text-4xl">👩‍🍳</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chef Michael Chen</h3>
              <p className="text-orange-600 font-medium mb-2">Head of Product Development</p>
              <p className="text-gray-600">
                A culinary expert with a passion for pet nutrition, Michael creates 
                delicious recipes that cats love and owners trust.
              </p>
            </div>

            <div className="text-center">
              <div className="aspect-square bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center mx-auto mb-4 w-32 h-32">
                <span className="text-4xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Alex Rodriguez</h3>
              <p className="text-orange-600 font-medium mb-2">Founder & CEO</p>
              <p className="text-gray-600">
                The visionary behind Opaw Cat Food, Alex started the company after 
                seeing the positive impact of quality nutrition on his own cat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Family</h2>
          <p className="text-xl text-orange-100 mb-8">
            Be part of a community that puts your cat's health and happiness first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Our Products
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
