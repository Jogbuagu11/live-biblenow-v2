
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState(false);

  const donationOptions = [
    { value: 25, label: '$25' },
    { value: 50, label: '$50' },
    { value: 100, label: '$100' },
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleDonate = () => {
    const amount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
    if (amount <= 0) {
      alert("Please select or enter a valid donation amount");
      return;
    }

    // In a real implementation, this would connect to Stripe
    console.log("Processing donation:", {
      amount,
      isRecurring,
    });

    // Here you would typically redirect to Stripe checkout
    alert(`Thank you for your ${isRecurring ? "recurring " : ""}donation of $${amount}!`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-biblebrown">Support Pastor John's Ministry</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-center text-gray-600 mb-4">Your donation helps continue spreading the message of faith and hope.</p>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            {donationOptions.map((option) => (
              <Card
                key={option.value}
                className={`p-4 text-center cursor-pointer transition-all hover:shadow-md ${
                  selectedAmount === option.value ? 'border-2 border-biblegold bg-biblegold/10' : ''
                }`}
                onClick={() => handleAmountSelect(option.value)}
              >
                <p className="font-bold text-lg">{option.label}</p>
              </Card>
            ))}
          </div>
          
          <div className="mb-4">
            <Label htmlFor="custom-amount" className="block mb-1">Custom Amount</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <Input
                id="custom-amount"
                type="number"
                min="1"
                step="any"
                placeholder="Enter amount"
                className="pl-8"
                value={customAmount}
                onChange={handleCustomAmountChange}
              />
            </div>
          </div>
          
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="recurring"
              checked={isRecurring}
              onChange={() => setIsRecurring(!isRecurring)}
              className="h-4 w-4 text-biblegold border-gray-300 rounded focus:ring-biblegold"
            />
            <label htmlFor="recurring" className="ml-2 text-gray-600">
              Make this a recurring monthly donation
            </label>
          </div>
          
          <Button 
            className="w-full bg-biblebrown text-white hover:bg-opacity-90"
            onClick={handleDonate}
          >
            Donate Now
          </Button>
          
          <p className="text-xs text-gray-500 mt-3 text-center">
            All donations are processed securely through Stripe.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
