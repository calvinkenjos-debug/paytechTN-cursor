"use client"

import React from "react"
import { cn } from "../../lib/utils"

interface Avatar {
  /** Optional photo. When omitted, a branded gradient circle is rendered instead. */
  imageUrl?: string
  profileUrl?: string
  /** CSS background used for the decorative (photo-less) circle. */
  gradient?: string
}
interface AvatarCirclesProps {
  className?: string
  numPeople?: number
  avatarUrls: Avatar[]
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)} aria-hidden="true">
      {avatarUrls.map((url, index) =>
        url.imageUrl ? (
          <img
            key={index}
            className="h-10 w-10 rounded-full border-2 border-black dark:border-gray-800"
            src={url.imageUrl}
            width={40}
            height={40}
            alt=""
          />
        ) : (
          <span
            key={index}
            className="h-10 w-10 rounded-full border-2 border-black dark:border-gray-800"
            style={{ background: url.gradient ?? "linear-gradient(135deg, #ff5533, #7a2418)" }}
          />
        )
      )}
      {(numPeople ?? 0) > 0 && (
        <a
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-neutral-800 text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
          href=""
        >
          +{numPeople}
        </a>
      )}
    </div>
  )
}