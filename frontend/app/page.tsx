import { ApiResponse, getServices } from "@/app/action";
import ServiceDelete from "@/components/main/service-delete";
import ServicePagination from "@/components/main/service-pagination";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Service } from "@/types";
import { Alert01Icon, DropboxIcon, LoaderCircle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Suspense } from "react";

export default async function ServicePage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const page = (await searchParams).page ?? "1";
    const data = await getServices({ page, limit: "6" });

    return (
        <main className="container mx-auto p-4 sm:p-6 flex-1 flex flex-col gap-4 sm:gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Services</h1>
                <Link href="/create-service">
                    <Button>Create Service</Button>
                </Link>
            </div>
            <Suspense fallback={<EmptyState variant="loading" />}>
                <ServiceList data={data} />
            </Suspense>
            <ServicePagination page={parseInt(page)} limit={data?.meta?.limit} total={data?.meta?.total} />
        </main>
    );
}

async function ServiceList({ data }: { data: ApiResponse<Service[]> }) {
    if (!data?.success) {
        return <EmptyState variant="error" />;
    }

    if (data?.data?.length === 0) {
        return <EmptyState variant="empty" />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data?.map((service) => (
                <div key={service._id} className="flex flex-col gap-4 py-4 border rounded-xl">
                    <div className="px-4">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-medium leading-none">{service.title}</h4>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                ${service.price.toFixed(2)}
                            </span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground/80">
                            Listed on {new Date(service.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="-my-1 px-4 flex-1">
                        <p className="text-sm text-muted-foreground line-clamp-4">{service.description}</p>
                    </div>
                    <Separator />
                    <div className="flex justify-end items-center gap-2 px-4">
                        <Link href={`/update-service/${service._id}`}>
                            <Button variant="outline" size="xs">
                                Edit
                            </Button>
                        </Link>
                        <ServiceDelete id={service._id} />
                    </div>
                </div>
            ))}
        </div>
    );
}

const emptyStateConfig = {
    loading: {
        icon: LoaderCircle,
        title: "Services are loading",
        description: "Please wait while we load the services",
        containerClass: "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/30",
        iconClass: "text-blue-500 animate-spin",
        titleClass: "text-blue-300",
        descClass: "text-blue-500/80",
    },
    empty: {
        icon: DropboxIcon,
        title: "No services found",
        description: "Get started by creating a new service listing.",
        containerClass: "border-dashed",
        iconClass: "text-muted-foreground",
        titleClass: "text-muted-foreground",
        descClass: "text-muted-foreground/80",
    },
    error: {
        icon: Alert01Icon,
        title: "Something went wrong",
        description: "Failed to load services. Please try again.",
        containerClass: "border-destructive/30 bg-destructive/10",
        iconClass: "text-destructive",
        titleClass: "text-destructive",
        descClass: "text-destructive/80",
    },
} as const;

function EmptyState({ variant }: { variant: "loading" | "empty" | "error" }) {
    const config = emptyStateConfig[variant];

    return (
        <div className={cn("flex-1 flex flex-col justify-center items-center text-center rounded-xl border", config.containerClass)}>
            <HugeiconsIcon icon={config.icon} className={cn("size-10 mb-2", config.iconClass)} />
            <h3 className={cn("text-lg font-medium", config.titleClass)}>{config.title}</h3>
            <p className={cn("text-sm", config.descClass)}>{config.description}</p>
        </div>
    );
}
