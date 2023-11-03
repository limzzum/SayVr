package com.npc.say_vr.domain.game.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRanking is a Querydsl query type for Ranking
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRanking extends EntityPathBase<Ranking> {

    private static final long serialVersionUID = 143902946L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRanking ranking = new QRanking("ranking");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> point = createNumber("point", Integer.class);

    public final QTier tier;

    public final com.npc.say_vr.domain.user.domain.QUser user;

    public QRanking(String variable) {
        this(Ranking.class, forVariable(variable), INITS);
    }

    public QRanking(Path<? extends Ranking> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRanking(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRanking(PathMetadata metadata, PathInits inits) {
        this(Ranking.class, metadata, inits);
    }

    public QRanking(Class<? extends Ranking> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.tier = inits.isInitialized("tier") ? new QTier(forProperty("tier")) : null;
        this.user = inits.isInitialized("user") ? new com.npc.say_vr.domain.user.domain.QUser(forProperty("user")) : null;
    }

}

