"use client"

import {useState} from "react";
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

type CollapsableCardProps = {
    title: string;
    children?: React.ReactNode;
}
export function CollapsibleCard({title, children}: CollapsableCardProps) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Card>
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="space-y-2"
            >
            <CardHeader className="flex-row">
                <CardTitle className="text-4xl flex-1">{title}</CardTitle>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </CardHeader>
            <CardContent>
            <CollapsibleContent>
                {children}
            </CollapsibleContent>
            </CardContent>
            </Collapsible>
        </Card>

    )
}
