import React from "react";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-blue-950 text-white">
      <div
        className="flex justify-center items-center font-semibold cursor-pointer py-4 gap-2 bg-blue-900/50 hover:bg-blue-800/60 transition-colors duration-300"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="h-5 w-5" /> Back to Top
      </div>
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 py-12">
        <div>
          <span className="text-2xl font-bold mb-4 cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Hatbato
          </span>
          <p className="text-sm text-blue-100/80 leading-relaxed mt-3">
            The most trusted peer-to-peer marketplace where millions of users buy and sell safely. Join our community and discover amazing deals every
            day.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-blue-100/80">
              <Mail className="h-4 w-4 mr-2 text-blue-300" />
              adminhatbato@gmail.com
            </div>
            <div className="flex items-center text-sm text-blue-100/80">
              <Phone className="h-4 w-4 mr-2 text-blue-300" />
              (+977) 0123456789
            </div>
          </div>
        </div>
        <div>
          <span className="font-bold mb-4 text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">About Us</span>
          <ul className="space-y-3 mt-3">
            <li>
              <Link to="/" className="text-sm text-blue-100/80 hover:text-blue-300 transition-colors duration-200 cursor-pointer block">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm text-blue-100/80 hover:text-blue-300 transition-colors duration-200 cursor-pointer block">
                How to Buy
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm text-blue-100/80 hover:text-blue-300 transition-colors duration-200 cursor-pointer block">
                How to Sell
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm text-blue-100/80 hover:text-blue-300 transition-colors duration-200 cursor-pointer block">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Sell on Hatbato</h3>
          <ul className="space-y-3 mt-3">
            <li>
              <Link to="/sell" className="text-sm text-blue-100/80 hover:text-blue-300 transition-colors duration-200 cursor-pointer block">
                Sell Products
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm text-blue-100/80 hover:text-blue-300 transition-colors duration-200 cursor-pointer block">
                Advertise
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm text-blue-100/80 hover:text-blue-300 transition-colors duration-200 cursor-pointer block">
                Seller Guide
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm text-blue-100/80 hover:text-blue-300 transition-colors duration-200 cursor-pointer block">
                Affiliate Program
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Help & Support</h3>
          <ul className="space-y-3 mt-3">
            <li>
              <Link to="/" className="text-sm text-blue-100/80 hover:text-blue-300 transition-colors duration-200 cursor-pointer block">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-blue-100/80 hover:text-blue-300 transition-colors duration-200 cursor-pointer block">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm text-blue-100/80 hover:text-blue-300 transition-colors duration-200 cursor-pointer block">
                Report Seller
              </Link>
            </li>
            <li>
              <Link to="/" className="text-sm text-blue-100/80 hover:text-blue-300 transition-colors duration-200 cursor-pointer block">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-blue-900/30 py-8">
        <div className="max-w-screen-md mx-auto flex flex-col sm:flex-row items-center gap-4 px-6">
          <Label htmlFor="email" className="text-sm font-medium text-blue-200 shrink-0">
            Subscribe for updates:
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="flex-grow bg-white/10 border-blue-400/30 text-white placeholder-blue-200/60 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg">
            Subscribe
          </Button>
        </div>
      </div>
      <div className="bg-blue-950 text-blue-300/70 text-xs text-center py-4 border-t border-blue-800/50 font-medium">
        © {new Date().getFullYear()} Hatbato — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
