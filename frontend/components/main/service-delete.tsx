"use client";

import { deleteService } from "@/app/action";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

export default function ServiceDelete({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    return (
        <Button
            variant="destructive"
            size="xs"
            onClick={() =>
                startTransition(async () => {
                    const result = await deleteService(id);
                    if (result?.success) {
                        toast.success("Service deleted successfully");
                    } else {
                        toast.error(result?.message || "Failed to delete service");
                    }
                })
            }
        >
            {isPending ? "Deleting..." : "Delete"}
        </Button>
    );
}
