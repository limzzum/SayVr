package com.npc.say_vr.domain.study.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWeeklySprint is a Querydsl query type for WeeklySprint
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWeeklySprint extends EntityPathBase<WeeklySprint> {

    private static final long serialVersionUID = 573423194L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWeeklySprint weeklySprint = new QWeeklySprint("weeklySprint");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    public final ListPath<ChecklistItem, QChecklistItem> checklistItemList = this.<ChecklistItem, QChecklistItem>createList("checklistItemList", ChecklistItem.class, QChecklistItem.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final ListPath<Goal, QGoal> GoalList = this.<Goal, QGoal>createList("GoalList", Goal.class, QGoal.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final QStudy study;

    public final DatePath<java.time.LocalDate> targetDate = createDate("targetDate", java.time.LocalDate.class);

    public QWeeklySprint(String variable) {
        this(WeeklySprint.class, forVariable(variable), INITS);
    }

    public QWeeklySprint(Path<? extends WeeklySprint> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWeeklySprint(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWeeklySprint(PathMetadata metadata, PathInits inits) {
        this(WeeklySprint.class, metadata, inits);
    }

    public QWeeklySprint(Class<? extends WeeklySprint> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.study = inits.isInitialized("study") ? new QStudy(forProperty("study")) : null;
    }

}

