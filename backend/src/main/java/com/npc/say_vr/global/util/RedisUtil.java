package com.npc.say_vr.global.util;

import com.npc.say_vr.domain.game.dto.GameStatusDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisUtil {

    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisTemplate<String, Object> redisGameStatusTemplate;
    private final RedisTemplate<String, Object> redisBlackListTemplate;

    @Value("${jwt.expmin}")
    private int expMin;

    public void set(String key, Object o, int milli) {
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(o.getClass()));
        redisTemplate.opsForValue().set(key, o, milli, TimeUnit.MILLISECONDS);
    }

    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public boolean delete(String key) {
        return Boolean.TRUE.equals(redisTemplate.delete(key));
    }

    public boolean hasKey(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    public void setExcludeList(String key, Object o) {
        redisBlackListTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(o.getClass()));
        redisBlackListTemplate.opsForValue().set(key, o, expMin, TimeUnit.MILLISECONDS);
    }

    public Object getExcludeList(String key) {
        return redisBlackListTemplate.opsForValue().get(key);
    }

    public boolean deleteExcludeList(String key) {
        return Boolean.TRUE.equals(redisBlackListTemplate.delete(key));
    }

    public boolean hasKeyExcludeList(String key) {
        return Boolean.TRUE.equals(redisBlackListTemplate.hasKey(key));
    }

    public void setGameStatusList(String key, GameStatusDto gameStatusDto) {
        redisGameStatusTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(gameStatusDto.getClass()));
        redisGameStatusTemplate.opsForValue().set(key, gameStatusDto, 30 * 1000 * 60, TimeUnit.MILLISECONDS);
    }

    public GameStatusDto getGameStatusList(String key) {
        return (GameStatusDto) redisGameStatusTemplate.opsForValue().get(key);
    }

    public boolean deleteGameStatusList(String key) {
        return Boolean.TRUE.equals(redisGameStatusTemplate.delete(key));
    }

    public boolean hasKeyGameStatusList(String key) {
        return Boolean.TRUE.equals(redisGameStatusTemplate.hasKey(key));
    }

    public List<GameStatusDto> getGameStatusValues() {
        List<GameStatusDto> gameStatusDtos = new ArrayList<>();
        Set<String> keys = redisGameStatusTemplate.keys("*");
        for (String key : keys) {
            GameStatusDto gameStatusDto = (GameStatusDto) redisGameStatusTemplate.opsForValue().get(key);
            gameStatusDtos.add(gameStatusDto);
        }
        return gameStatusDtos;
    }





}