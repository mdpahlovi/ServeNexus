import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { getServices } from "./action";

export default async function Home() {
    const data = await getServices({});

    return (
        <main className="container mx-auto p-4 sm:p-6 flex-1 flex flex-col">
            <div className="mb-4 sm:mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Services</h1>
                <Link href="/create-service">
                    <Button>Add Service</Button>
                </Link>
            </div>
            {data?.data?.length === 0 ? (
                <div className="flex-1 flex flex-col justify-center items-center text-center border rounded-xl">
                    <h3 className="text-lg font-medium">No services found</h3>
                    <p className="text-sm text-muted-foreground">Get started by creating a new service listing.</p>
                </div>
            ) : (
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
                                <Button variant="outline" size="xs">
                                    Edit
                                </Button>
                                <Button variant="destructive" size="xs">
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
