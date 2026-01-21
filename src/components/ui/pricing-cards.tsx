'use client';
import React from 'react';
import { PlusIcon, ShieldCheckIcon, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './badge';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { BorderTrail } from './border-trail';

export function PricingCards() {
    return (
        <section className="relative py-20 overflow-hidden bg-gray-50" dir="rtl">
            <div id="pricing" className="mx-auto w-full max-w-4xl space-y-8 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-xl space-y-4 text-center"
                >
                    <div className="w-16 h-1 bg-teal-500 rounded-full mx-auto mb-4" />
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                        תמחור פשוט ושקוף
                    </h2>
                    <p className="text-gray-600 md:text-lg">
                        בחרו את התוכנית שמתאימה לכם והתחילו היום
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="mx-auto w-full max-w-2xl"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Monthly Plan */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-gray-900">חודשי</h3>
                                <p className="text-gray-500 text-sm">גמישות מקסימלית</p>
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-end gap-1">
                                    <span className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                                        ₪30
                                    </span>
                                    <span className="text-gray-500 mb-1">/לחודש</span>
                                </div>
                                <p className="text-gray-500 text-sm">חיוב חודשי</p>
                                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white" asChild>
                                    <a href="#signup">התחילו עכשיו</a>
                                </Button>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                {['גישה לכל הפיצ׳רים', 'סנכרון בין מכשירים', 'תמיכה מהירה'].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                                        <Check className="w-4 h-4 text-teal-500" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Annual Plan - Best Value */}
                        <div className="relative bg-gray-900 rounded-2xl border-2 border-teal-500 p-6 shadow-xl">
                            <BorderTrail
                                className="bg-teal-400"
                                style={{
                                    boxShadow:
                                        '0px 0px 60px 30px rgb(20 184 166 / 50%), 0 0 100px 60px rgb(6 182 212 / 30%)',
                                }}
                                size={100}
                            />
                            <Badge className="absolute -top-3 right-6 bg-teal-500 text-white border-0 px-3 py-1">
                                הכי משתלם
                            </Badge>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">שנתי</h3>
                                <p className="text-gray-400 text-sm">חסכו 50%!</p>
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-end gap-1">
                                    <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                                        ₪15
                                    </span>
                                    <span className="text-gray-400 mb-1">/לחודש</span>
                                </div>
                                <p className="text-gray-400 text-sm">₪180 לשנה</p>
                                <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white" asChild>
                                    <a href="#signup">התחילו עכשיו</a>
                                </Button>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-700 space-y-3">
                                {['גישה לכל הפיצ׳רים', 'סנכרון בין מכשירים', 'תמיכה מהירה', 'חודש נוסף במתנה!'].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                                        <Check className="w-4 h-4 text-teal-400" />
                                        <span className={cn(feature.includes('במתנה') && "font-bold text-teal-100")}>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-gray-500 flex items-center justify-center gap-x-2 text-sm mt-6">
                        <ShieldCheckIcon className="size-4" />
                        <span>ללא עלויות נסתרות • ביטול בכל עת</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
