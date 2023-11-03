package com.npc.say_vr.domain.study.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGoal is a Querydsl query type for Goal
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGoal extends EntityPathBase<Goal> {

    private static final long serialVersionUID = 112640626L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGoal goal = new QGoal("goal");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    public final ListPath<ChecklistItem, QChecklistItem> checklistItemList = this.<ChecklistItem, QChecklistItem>createList("checklistItemList", ChecklistItem.class, QChecklistItem.class, PathInits.DIRECT2);

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final EnumPath<com.npc.say_vr.domain.study.constant.OptionType> optionType = createEnum("optionType", com.npc.say_vr.domain.study.constant.OptionType.class);

    public final QWeeklySprint weeklySprint;

    public QGoal(String variable) {
        this(Goal.class, forVariable(variable), INITS);
    }

    public QGoal(Path<? extends Goal> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGoal(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGoal(PathMetadata metadata, PathInits inits) {
        this(Goal.class, metadata, inits);
    }

    public QGoal(Class<? extends Goal> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.weeklySprint = inits.isInitialized("weeklySprint") ? new QWeeklySprint(forProperty("weeklySprint"), inits.get("weeklySprint")) : null;
    }

}

