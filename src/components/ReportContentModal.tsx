
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AlertTriangle, Flag } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

interface FlagReason {
  id: number;
  key: string;
  label: string;
  scripture_reference: string;
  full_verse: string;
}

interface ReportFormValues {
  reason_key: string;
  custom_reason?: string;
  report_url?: string;
}

interface ReportContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReportContentModal({ open, onOpenChange }: ReportContentModalProps) {
  const [flagReasons, setFlagReasons] = useState<FlagReason[]>([]);
  const [selectedReason, setSelectedReason] = useState<FlagReason | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<Date | null>(null);

  const form = useForm<ReportFormValues>({
    defaultValues: {
      reason_key: '',
      custom_reason: '',
      report_url: '',
    },
  });

  const watchReasonKey = form.watch('reason_key');

  useEffect(() => {
    if (open) {
      fetchFlagReasons();
    } else {
      form.reset();
      setSelectedReason(null);
    }
  }, [open, form]);

  useEffect(() => {
    if (watchReasonKey && flagReasons.length > 0) {
      const reason = flagReasons.find(r => r.key === watchReasonKey);
      setSelectedReason(reason || null);
    } else {
      setSelectedReason(null);
    }
  }, [watchReasonKey, flagReasons]);

  const fetchFlagReasons = async () => {
    try {
      const { data, error } = await supabase
        .from('flag_reasons')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        throw error;
      }

      setFlagReasons(data || []);
    } catch (error) {
      console.error('Error fetching flag reasons:', error);
      toast.error('Failed to load reporting options');
    }
  };

  const handleSubmit = async (values: ReportFormValues) => {
    try {
      // Check for rate limiting (once per minute)
      const now = new Date();
      if (lastSubmissionTime && (now.getTime() - lastSubmissionTime.getTime()) < 60000) {
        toast.error('Please wait a minute before submitting another report');
        return;
      }

      setIsSubmitting(true);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('You must be logged in to report content');
        return;
      }

      const { error } = await supabase
        .from('flagged_content')
        .insert({
          content_id: null, // Set to null for general reports
          content_type: 'unspecified',
          reported_by: user.id,
          reason_key: values.reason_key,
          custom_reason: values.reason_key === 'other' ? values.custom_reason : null,
          report_url: values.report_url || null,
          flagged_at: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }

      toast.success('Report submitted successfully');
      setLastSubmissionTime(now);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-primary" />
            Report Content or User
          </DialogTitle>
          <DialogDescription>
            Use this form to report any content or user that violates our community guidelines.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="reason_key"
              rules={{ required: 'Please select a reason' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Report</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {flagReasons.map((reason) => (
                        <SelectItem key={reason.key} value={reason.key}>
                          {reason.label} - {reason.scripture_reference}
                        </SelectItem>
                      ))}
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />

                  {selectedReason && (
                    <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                      <p className="font-medium mb-1">{selectedReason.scripture_reference}</p>
                      <p className="italic">{selectedReason.full_verse}</p>
                    </div>
                  )}
                </FormItem>
              )}
            />

            {watchReasonKey === 'other' && (
              <FormField
                control={form.control}
                name="custom_reason"
                rules={{ required: 'Please specify a reason' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please specify</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us why you are reporting this content" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="report_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link to Reported Content (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://biblenow.io/profile/username" 
                      type="url"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
