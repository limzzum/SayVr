package com.npc.say_vr.domain.vr.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMap is a Querydsl query type for Map
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMap extends EntityPathBase<Map> {

    private static final long serialVersionUID = 555805054L;

    public static final QMap map = new QMap("map");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public QMap(String variable) {
        super(Map.class, forVariable(variable));
    }

    public QMap(Path<? extends Map> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMap(PathMetadata metadata) {
        super(Map.class, metadata);
    }

}

