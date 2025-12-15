"use client";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
    // These variables are used inside useEffect and must be dependencies
    const router = useRouter(); 
    const searchParams = useSearchParams();
    
    const query = searchParams.get("subject") || "";

    const [subject, setSubject] = useState(query);

    useEffect(() => {
        let newUrl = "";
        if (subject === "all") {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject,
            });
        }
        
        // The Next.js functions 'router.push' and 'searchParams.toString()' are used here.
        // Even though Next.js hook results are often stable, ESLint's exhaustive-deps rule 
        // requires them to be listed since they are not primitives (string, number, etc.)
        router.push(newUrl, { scroll: false }); 
        
    }, [subject, router, searchParams]); // <-- FIX: Added 'router' and 'searchParams'

    return (
        <Select onValueChange={setSubject} value={subject}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="capitalize">
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SubjectFilter;