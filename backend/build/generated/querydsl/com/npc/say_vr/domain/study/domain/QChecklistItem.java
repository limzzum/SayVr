package com.npc.say_vr.domain.study.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChecklistItem is a Querydsl query type for ChecklistItem
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChecklistItem extends EntityPathBase<ChecklistItem> {

    private static final long serialVersionUID = -1403480742L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChecklistItem checklistItem = new QChecklistItem("checklistItem");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    public final EnumPath<com.npc.say_vr.domain.study.constant.CheckListStatus> checkListStatus = createEnum("checkListStatus", com.npc.say_vr.domain.study.constant.CheckListStatus.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Integer> current_count = createNumber("current_count", Integer.class);

    public final StringPath description = createString("description");

    public final QGoal goal;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final EnumPath<com.npc.say_vr.domain.study.constant.OptionCheckItem> optionCheckItem = createEnum("optionCheckItem", com.npc.say_vr.domain.study.constant.OptionCheckItem.class);

    public final QStudyMember studyMember;

    public final QWeeklySprint weeklySprint;

    public QChecklistItem(String variable) {
        this(ChecklistItem.class, forVariable(variable), INITS);
    }

    public QChecklistItem(Path<? extends ChecklistItem> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChecklistItem(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChecklistItem(PathMetadata metadata, PathInits inits) {
        this(ChecklistItem.class, metadata, inits);
    }

    public QChecklistItem(Class<? extends ChecklistItem> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.goal = inits.isInitialized("goal") ? new QGoal(forProperty("goal"), inits.get("goal")) : null;
        this.studyMember = inits.isInitialized("studyMember") ? new QStudyMember(forProperty("studyMember"), inits.get("studyMember")) : null;
        this.weeklySprint = inits.isInitialized("weeklySprint") ? new QWeeklySprint(forProperty("weeklySprint"), inits.get("weeklySprint")) : null;
    }

}

