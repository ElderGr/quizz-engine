import { useState } from "react";

interface IUseCountdown {
    initialTime: number
}

export function useCountdown({ initialTime }: IUseCountdown) {
    const [timeLeft, setTimeLeft] = useState(initialTime)
    const [timeInterval, setTimeInterval] = useState<number | null>(null);

    const startTimer = () => {
        setTimeInterval(setInterval(() => {
            setTimeLeft((prev) => {
                if(prev > 0) {
                    return prev - 1
                } else {
                    if(timeInterval) clearInterval(timeInterval)
                    return 0
                }
            });
        }, 1000));
    }

    const resetTimer = () => {
        setTimeLeft(300);
        if(timeInterval) clearInterval(timeInterval);
    }
    
    return {
        timeLeft,
        resetTimer,
        startTimer
    }
}