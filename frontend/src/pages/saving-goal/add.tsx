"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format, isAfter, isBefore, addMonths } from "date-fns";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  CalendarDays,
  Upload,
  Save,
  CheckCircle2,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link, useRouter } from "@tanstack/react-router";
import { formatCurrency } from "@/helpers/formats/number-format";

// Define the validation schema using Zod
const formSchema = z
  .object({
    goalName: z
      .string()
      .min(3, { message: "Goal name must be at least 3 characters" })
      .max(50, { message: "Goal name must not exceed 50 characters" }),
    targetAmount: z
      .string()
      .min(1, { message: "Please enter a target amount" })
      .refine((val) => !isNaN(Number(val)), {
        message: "Amount must be a number",
      })
      .refine((val) => Number(val) > 0, {
        message: "Amount must be greater than 0",
      }),
    description: z.string().optional(),
    goalType: z.enum(["target-date", "ongoing"]),
    startDate: z.date({ required_error: "Please select a start date" }),
    endDate: z.date().optional(),
    category: z
      .string({ required_error: "Please select a category" })
      .min(1, { message: "Please select a category" }),
  })
  .refine(
    (data) => {
      // If goal type is target-date, end date is required
      if (data.goalType === "target-date") {
        return data.endDate !== undefined;
      }
      return true;
    },
    {
      message: "Please select an end date for time-bound goals",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      // If end date is provided, it must be after start date
      if (data.endDate && data.startDate) {
        return isAfter(data.endDate, data.startDate);
      }
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

type FormValues = z.infer<typeof formSchema>;

export default function AddSavingGoalPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goalName: "",
      targetAmount: "",
      description: "",
      goalType: "target-date",
      startDate: new Date(),
      endDate: addMonths(new Date(), 1), // Default to 6 months from now
      category: "",
    },
  });

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form data:", data);
      console.log("Image:", imagePreview);

      setSubmitSuccess(true);

      // Redirect after successful submission
      setTimeout(() => {
        router.navigate({ to: "/saving-goals" });
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
      {/* Main Content */}
      <div>
        <div className="flex items-center mb-1">
          <Link
            to="/saving-goals"
            className="flex items-center text-emerald-600 hover:text-emerald-700"
          >
            <span>Saving Goals</span>
          </Link>
          <span className="mx-1.5">/</span>
          <span>Create New Saving Goal</span>
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-emerald-600 ">
            Create New Saving Goal
          </h1>
        </div>
      </div>

      <main className="w-9/12 mx-auto">
        {submitSuccess && (
          <Alert className="mb-6 bg-emerald-50 text-emerald-800 border-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your saving goal has been created successfully. Redirecting to
              saving goals...
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Goal Details</CardTitle>
                    <CardDescription>
                      Enter the details of your saving goal to help you track
                      your progress.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="goalName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Goal Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Vacation Fund, New Laptop, etc."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="targetAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Amount</FormLabel>
                          <FormControl>
                            <div className="relative flex items-center">
                              <DollarSign className="absolute left-3 h-5 w-5 text-gray-500" />
                              <input
                                type="text"
                                inputMode="numeric"
                                className="pl-10 pr-10 w-full border border-input bg-background px-3 py-2 text-sm shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                                placeholder="0"
                                value={formatCurrency(field.value)}
                                onChange={(e) => {
                                  const rawValue = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  ); // chỉ giữ số
                                  field.onChange(rawValue); // cập nhật vào form
                                }}
                              />
                              <div className="absolute right-3 text-gray-500">
                                VND
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add some details about your saving goal..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarDays className="mr-2 h-4 w-4" />
                                    {field.value
                                      ? format(field.value, "PPP")
                                      : "Select date"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarDays className="mr-2 h-4 w-4" />
                                    {field.value
                                      ? format(field.value, "PPP")
                                      : "Select date"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value || undefined}
                                  onSelect={field.onChange}
                                  initialFocus
                                  disabled={(date) =>
                                    isBefore(
                                      date,
                                      form.getValues("startDate") || new Date()
                                    )
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="travel">Travel</SelectItem>
                              <SelectItem value="education">
                                Education
                              </SelectItem>
                              <SelectItem value="housing">Housing</SelectItem>
                              <SelectItem value="transportation">
                                Transportation
                              </SelectItem>
                              <SelectItem value="emergency">
                                Emergency Fund
                              </SelectItem>
                              <SelectItem value="retirement">
                                Retirement
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Goal Image</CardTitle>
                    <CardDescription>
                      Add an image to represent your goal
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <div className="w-full aspect-square bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                        {imagePreview ? (
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Goal preview"
                            width={300}
                            height={300}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">
                              Upload an image
                            </p>
                          </div>
                        )}
                      </div>
                      <Label
                        htmlFor="image-upload"
                        className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm flex items-center justify-center w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Image
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-4 mt-6">
                  <Button variant="outline" type="button" asChild>
                    <Link to="/saving-goals">Cancel</Link>
                  </Button>
                  <Button
                    type="submit"
                    className="gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">
                          <svg className="h-4 w-4" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        </span>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Save Goal</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
