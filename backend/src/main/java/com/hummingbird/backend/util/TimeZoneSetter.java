package com.hummingbird.backend.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class TimeZoneSetter {
    public static LocalDateTime localToKTC(LocalDateTime time){
        return time.plusHours(9);
    }

    public static LocalDateTime KTCToLocal(LocalDateTime time){
        return time.minusHours(9);
    }
}
