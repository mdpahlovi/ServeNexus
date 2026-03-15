"use client";

import { createOrUpdateService } from "@/app/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";
import { toast } from "sonner";

type ServiceFormProps = {
    data?: {
        id: string;
        title: string;
        description: string;
        price: number;
    };
};

export default function ServiceForm({ data }: ServiceFormProps) {
    const [isPending, startTransition] = useTransition();

    return (
        <form
            className="space-y-4"
            onSubmit={(e) =>
                startTransition(async () => {
                    const result = await createOrUpdateService(e, data?.id);
                    if (result?.success) {
                        toast.success(`Service ${data?.id ? "updated" : "created"} successfully`);
                    } else {
                        toast.error(result?.message || `Failed to ${data?.id ? "update" : "create"} service`);
                    }
                })
            }
        >
            <div className="space-y-2">
                <Label>Title</Label>
                <Input name="title" defaultValue={data?.title} placeholder="Enter Title" required />
            </div>
            <div className="space-y-2">
                <Label>Description</Label>
                <Textarea name="description" defaultValue={data?.description} placeholder="Enter Description" required />
            </div>
            <div className="space-y-2">
                <Label>Price</Label>
                <Input name="price" type="number" defaultValue={data?.price || undefined} placeholder="Enter Price" required />
            </div>
            <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                    {isPending ? `${data?.id ? "Updating..." : "Creating..."}` : `${data?.id ? "Update" : "Create"} Service`}
                </Button>
            </div>
        </form>
    );
}
