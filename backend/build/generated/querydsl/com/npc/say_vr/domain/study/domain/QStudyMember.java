package com.npc.say_vr.domain.study.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudyMember is a Querydsl query type for StudyMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudyMember extends EntityPathBase<StudyMember> {

    private static final long serialVersionUID = -1488892540L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudyMember studyMember = new QStudyMember("studyMember");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    public final ListPath<ChecklistItem, QChecklistItem> checklistItemList = this.<ChecklistItem, QChecklistItem>createList("checklistItemList", ChecklistItem.class, QChecklistItem.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final EnumPath<com.npc.say_vr.global.constant.Status> status = createEnum("status", com.npc.say_vr.global.constant.Status.class);

    public final QStudy study;

    public final EnumPath<com.npc.say_vr.domain.study.constant.StudyRole> studyRole = createEnum("studyRole", com.npc.say_vr.domain.study.constant.StudyRole.class);

    public final com.npc.say_vr.domain.user.domain.QUser user;

    public QStudyMember(String variable) {
        this(StudyMember.class, forVariable(variable), INITS);
    }

    public QStudyMember(Path<? extends StudyMember> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudyMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudyMember(PathMetadata metadata, PathInits inits) {
        this(StudyMember.class, metadata, inits);
    }

    public QStudyMember(Class<? extends StudyMember> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.study = inits.isInitialized("study") ? new QStudy(forProperty("study")) : null;
        this.user = inits.isInitialized("user") ? new com.npc.say_vr.domain.user.domain.QUser(forProperty("user")) : null;
    }

}

