
import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  
  const donationAmounts = [25, 50, 100];

  const handleDonate = () => {
    // This would be replaced with actual Stripe checkout
    const amount = selectedAmount !== null ? selectedAmount : Number(customAmount);
    alert(`Donation of $${amount} ${isRecurring ? '(recurring monthly)' : '(one-time)'} would be processed here with Stripe.`);
    onClose();
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-biblebrown">Support Pastor John</CardTitle>
            <button onClick={onClose} className="text-gray-500 hover:text-biblebrown">
              <X className="h-5 w-5" />
            </button>
          </div>
          <CardDescription>
            Your donation helps spread God's word through our ministry.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Select an amount</h3>
            <div className="grid grid-cols-3 gap-2">
              {donationAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`p-3 rounded-md border ${
                    selectedAmount === amount
                      ? 'bg-biblegold/20 border-biblegold text-biblebrown'
                      : 'border-gray-300 hover:border-biblegold'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Or enter a custom amount</h3>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Other amount"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-biblegold focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <input
              id="recurring"
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="h-4 w-4 text-biblegold focus:ring-biblegold border-gray-300 rounded"
            />
            <label htmlFor="recurring" className="text-sm text-gray-700">
              Make this a recurring monthly donation
            </label>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleDonate}
            disabled={!selectedAmount && !customAmount}
            className="w-full bg-biblebrown hover:bg-opacity-90"
          >
            Donate {selectedAmount ? `$${selectedAmount}` : customAmount ? `$${customAmount}` : ''}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DonationModal;
