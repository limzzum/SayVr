package com.npc.say_vr.domain.vr.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QScore is a Querydsl query type for Score
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScore extends EntityPathBase<Score> {

    private static final long serialVersionUID = 1558315572L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QScore score = new QScore("score");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    public final NumberPath<Integer> averageTotal = createNumber("averageTotal", Integer.class);

    public final NumberPath<Integer> contextTotal = createNumber("contextTotal", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Integer> grammarTotal = createNumber("grammarTotal", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final NumberPath<Integer> pronunciationTotal = createNumber("pronunciationTotal", Integer.class);

    public final com.npc.say_vr.domain.user.domain.QUser user;

    public QScore(String variable) {
        this(Score.class, forVariable(variable), INITS);
    }

    public QScore(Path<? extends Score> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QScore(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QScore(PathMetadata metadata, PathInits inits) {
        this(Score.class, metadata, inits);
    }

    public QScore(Class<? extends Score> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.npc.say_vr.domain.user.domain.QUser(forProperty("user")) : null;
    }

}

