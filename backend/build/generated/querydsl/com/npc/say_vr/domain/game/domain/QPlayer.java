package com.npc.say_vr.domain.game.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPlayer is a Querydsl query type for Player
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlayer extends EntityPathBase<Player> {

    private static final long serialVersionUID = 1896831157L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPlayer player = new QPlayer("player");

    public final QGame game;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<com.npc.say_vr.domain.game.constant.PlayerStatus> status = createEnum("status", com.npc.say_vr.domain.game.constant.PlayerStatus.class);

    public final com.npc.say_vr.domain.user.domain.QUser user;

    public final NumberPath<Integer> winCnt = createNumber("winCnt", Integer.class);

    public QPlayer(String variable) {
        this(Player.class, forVariable(variable), INITS);
    }

    public QPlayer(Path<? extends Player> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPlayer(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPlayer(PathMetadata metadata, PathInits inits) {
        this(Player.class, metadata, inits);
    }

    public QPlayer(Class<? extends Player> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.game = inits.isInitialized("game") ? new QGame(forProperty("game")) : null;
        this.user = inits.isInitialized("user") ? new com.npc.say_vr.domain.user.domain.QUser(forProperty("user")) : null;
    }

}

