import ServiceForm from "@/components/main/service-form";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function CreateService() {
    return (
        <main className="container mx-auto p-4 sm:p-6 flex-1 flex flex-col gap-4 sm:gap-6">
            <div className="flex justify-start items-center gap-4">
                <Link href="/">
                    <Button variant="outline" size="icon">
                        <HugeiconsIcon icon={ArrowLeftIcon} strokeWidth={2} />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Create Service</h1>
            </div>
            <ServiceForm />
        </main>
    );
}
