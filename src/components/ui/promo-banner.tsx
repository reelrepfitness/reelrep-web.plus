"use client"

import { useState } from "react"
import Image from "next/image"
import { Banner } from "@/components/ui/banner"

export function PromoBanner() {
  const [show, setShow] = useState(true)

  const handleScrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className={show ? "fixed bottom-0 inset-x-0 sm:bottom-6 sm:right-6 sm:left-auto sm:max-w-md z-50 p-0 sm:p-0" : ""}>
      <Banner
        show={show}
        onHide={() => setShow(false)}
        icon={<Image src="/images/icon.png" alt="Reel Rep" width={40} height={40} className="h-20 w-20 object-contain" />}
        title={
          <span dir="rtl">
            <span className="font-semibold">הרשמה מוקדמת לאפליקציה כבר כאן!</span>
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> - </span>
            <span className="text-gray-600">50% הנחה לשנה הראשונה</span>
          </span>
        }
        action={{
          label: "הרשמו עכשיו",
          onClick: handleScrollToSignup,
        }}
        className="rounded-none sm:rounded-lg shadow-lg sm:shadow-2xl"
      />
    </div>
  )
}
