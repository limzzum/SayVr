package com.npc.say_vr.domain.vr.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QNpc is a Querydsl query type for Npc
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNpc extends EntityPathBase<Npc> {

    private static final long serialVersionUID = 555806467L;

    public static final QNpc npc = new QNpc("npc");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public QNpc(String variable) {
        super(Npc.class, forVariable(variable));
    }

    public QNpc(Path<? extends Npc> path) {
        super(path.getType(), path.getMetadata());
    }

    public QNpc(PathMetadata metadata) {
        super(Npc.class, metadata);
    }

}

