"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ServicePaginationProps = {
    page?: number;
    limit?: number;
    total?: number;
};

export default function ServicePagination({ page = 1, limit = 6, total = 0 }: ServicePaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const totalPages = Math.ceil(total / limit);

    const onPageChange = (pageNum: number) => {
        if (pageNum >= 1 && pageNum <= totalPages) {
            const params = new URLSearchParams(searchParams);
            params.set("page", pageNum.toString());
            router.push(`${pathname}?${params.toString()}`);
        }
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => onPageChange(page - 1)} aria-disabled={page === 1} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <PaginationItem key={pageNum}>
                        <PaginationLink onClick={() => onPageChange(pageNum)} isActive={pageNum === page}>
                            {pageNum}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext onClick={() => onPageChange(page + 1)} aria-disabled={page === totalPages} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
