'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// ❌ Image component was imported but not used, so I removed the import.
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { Search } from "lucide-react"; // Assuming you use lucide-react for the icon

const SearchInput = () => {
    // These variables are now used in the useEffect dependency array and function body
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    // const query = searchParams.get('topic') || ''; // This is commented out, so it's not an unused error.

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // This is the code that uses the previously "unused" variables (router, pathname, searchParams, etc.)
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500)
        
        // Cleanup function for setTimeout is important!
        return () => clearTimeout(delayDebounceFn);
        
    }, [searchQuery, router, searchParams, pathname]); // All dependencies are correctly listed!

    return (
        <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
            {/* 💡 Using the Search icon from lucide-react if you have it installed. */}
            <Search size={15} /> 
            
            {/* If you prefer to use your local image: */}
            {/* <Image src="/icons/search.svg" alt="search" width={15} height={15} /> */}
            
            <input
                placeholder="Search companions..."
                className="outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}

export default SearchInput;