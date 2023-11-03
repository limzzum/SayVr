package com.npc.say_vr.domain.user.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -601509640L;

    public static final QUser user = new QUser("user");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final StringPath nickname = createString("nickname");

    public final StringPath profile = createString("profile");

    public final ListPath<com.npc.say_vr.domain.study.domain.StudyMember, com.npc.say_vr.domain.study.domain.QStudyMember> studyMembers = this.<com.npc.say_vr.domain.study.domain.StudyMember, com.npc.say_vr.domain.study.domain.QStudyMember>createList("studyMembers", com.npc.say_vr.domain.study.domain.StudyMember.class, com.npc.say_vr.domain.study.domain.QStudyMember.class, PathInits.DIRECT2);

    public final StringPath username = createString("username");

    public final EnumPath<com.npc.say_vr.domain.user.constant.UserStatus> userStatus = createEnum("userStatus", com.npc.say_vr.domain.user.constant.UserStatus.class);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

