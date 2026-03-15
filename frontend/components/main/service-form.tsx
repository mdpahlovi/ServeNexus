import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";

export const serviceSchema = z.object({
    title: z.string().min(1, "Provide your service title"),
    description: z.string().min(1, "Provide your service description"),
    price: z.number().min(1, "Provide your service price"),
});

export default function ServiceForm({ data }: { data: z.infer<typeof serviceSchema> }) {
    return (
        <>
            <p className="rounded-md border border-destructive/30 px-3 py-2 bg-destructive/10 text-sm text-destructive">
                Something went wrong
            </p>
            <form className="space-y-4">
                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input name="title" required placeholder="Enter Title" />
                </div>
                <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea name="description" required placeholder="Enter Description" />
                </div>
                <div className="space-y-2">
                    <Label>Price</Label>
                    <Input name="price" required placeholder="Enter Price" />
                </div>
                <div className="flex justify-end">
                    <Button type="submit">Create Service</Button>
                </div>
            </form>
        </>
    );
}
