package com.npc.say_vr.global.util;

import static com.npc.say_vr.domain.user.constant.UserResponseMessage.NOT_VALID_REFRESH_TOKEN;

import com.npc.say_vr.domain.user.dto.UserResponseDto.TokenResponseDto;
import com.npc.say_vr.domain.user.exception.UserNotFoundException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.security.Key;
import java.util.Date;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    @Autowired
    private RedisUtil redisUtil;

    @Value("${jwt.expmin}")
    private int expireMin;

    @Value("${jwt.refresh-expmin}")
    private int refreshExpireMin;

    @Value("${jwt.secretKey}")
    private String secretKey;

    public String createRefreshToken(Long userId) {
        String refreshToken = create(userId, refreshExpireMin);
        redisUtil.set(String.valueOf(userId), refreshToken, refreshExpireMin);
        return refreshToken;
    }

    public String createJwtToken(Long userId) {
        return create(userId, expireMin);
    }

    public TokenResponseDto reCreateJwtToken(String refreshToken) {
        String userId = String.valueOf(getUserId(refreshToken));
        if (redisUtil.hasKey(userId) && redisUtil.get(userId).equals(refreshToken)) {
            String accessToken = createJwtToken(Long.valueOf(userId));
            refreshToken = createRefreshToken(Long.valueOf(userId));
            redisUtil.set(userId, refreshToken, refreshExpireMin);
            return TokenResponseDto.builder().accessToken(accessToken).refreshToken(refreshToken).build();
        }
        throw new UserNotFoundException(NOT_VALID_REFRESH_TOKEN.getMessage());
    }

    public void logout(Long userNo, String accessToken) {
        accessToken = accessToken.substring(7);
        try {
            getUserId(accessToken);
            redisUtil.setExcludeList(accessToken, "accessToken");
        } catch (Exception e) {
            throw new RuntimeException("유효하지 않은 토큰");
        }
    }

    public String create(Long userId, int expTime) {
        if (expTime <= 0) {
            throw new RuntimeException("만료시간은 0이상");
        }

        Long exp = (long) expTime * 60;
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(secretKey);
        Key signingKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

        Claims claims = Jwts.claims();
        claims.put("userId", userId);
        return Jwts.builder()
            .setClaims(claims)
            .signWith(signingKey, signatureAlgorithm)
            .setExpiration(new Date(System.currentTimeMillis() + exp))
            .compact();
    }

    public Long getUserId(String token) {
        if (redisUtil.hasKeyExcludeList(token)) {
            throw new RuntimeException("이미 로그아웃하였습니다");
        }
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
            .build()
            .parseClaimsJws(token)
            .getBody();
        return claims.get("userId", Long.class);
    }

    public boolean isValidToken(String token) {
        boolean isExpired = Jwts.parserBuilder()
            .setSigningKey(DatatypeConverter.parseBase64Binary(secretKey)).build()
            .parseClaimsJws(token)
            .getBody()
            .getExpiration().before(new Date());
        boolean isLogout = redisUtil.hasKeyExcludeList(token);
        return !isExpired && !isLogout;
    }
}

