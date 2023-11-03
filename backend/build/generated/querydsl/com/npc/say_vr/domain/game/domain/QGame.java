package com.npc.say_vr.domain.game.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QGame is a Querydsl query type for Game
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGame extends EntityPathBase<Game> {

    private static final long serialVersionUID = 654208710L;

    public static final QGame game = new QGame("game");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final EnumPath<com.npc.say_vr.domain.game.constant.GameStatus> status = createEnum("status", com.npc.say_vr.domain.game.constant.GameStatus.class);

    public final NumberPath<Integer> totalRound = createNumber("totalRound", Integer.class);

    public QGame(String variable) {
        super(Game.class, forVariable(variable));
    }

    public QGame(Path<? extends Game> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGame(PathMetadata metadata) {
        super(Game.class, metadata);
    }

}

