package com.npc.say_vr.domain.study.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudy is a Querydsl query type for Study
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudy extends EntityPathBase<Study> {

    private static final long serialVersionUID = -791857590L;

    public static final QStudy study = new QStudy("study");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Integer> currentPeople = createNumber("currentPeople", Integer.class);

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> maxPeople = createNumber("maxPeople", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final StringPath name = createString("name");

    public final StringPath rule = createString("rule");

    public final ListPath<StudyMember, QStudyMember> studyMembers = this.<StudyMember, QStudyMember>createList("studyMembers", StudyMember.class, QStudyMember.class, PathInits.DIRECT2);

    public final EnumPath<com.npc.say_vr.domain.study.constant.StudyStatus> studyStatus = createEnum("studyStatus", com.npc.say_vr.domain.study.constant.StudyStatus.class);

    public final ListPath<WeeklySprint, QWeeklySprint> weeklySprints = this.<WeeklySprint, QWeeklySprint>createList("weeklySprints", WeeklySprint.class, QWeeklySprint.class, PathInits.DIRECT2);

    public QStudy(String variable) {
        super(Study.class, forVariable(variable));
    }

    public QStudy(Path<? extends Study> path) {
        super(path.getType(), path.getMetadata());
    }

    public QStudy(PathMetadata metadata) {
        super(Study.class, metadata);
    }

}

