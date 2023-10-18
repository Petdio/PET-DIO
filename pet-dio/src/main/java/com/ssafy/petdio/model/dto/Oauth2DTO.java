package com.ssafy.petdio.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

public class Oauth2DTO {
    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class KakaoTokenResponse {
        private String token_type;
        private String access_token;
        private String id_token;
        private String expires_in;
        private String refresh_token;
        private String refresh_token_expires_in;
        private String scope;
    }

    @Getter
    @Setter
    @ToString
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class KakaoUserResponse {
        private String id;
        @JsonProperty("connected_at")
        private String connectedAt;
        @JsonProperty("for_partner")
        private ForPartnerDto forPartner;
        private PropertiesDto properties;
        @JsonProperty("kakao_account")
        private KakaoAccountDto kakaoAccount;
    }

    public static class ForPartnerDto {
        private String uuid;
    }

    @Data
    public static class PropertiesDto {
        private String nickname;
        @JsonProperty("profile_image")
        private String profileImage;
        @JsonProperty("thumbnail_image")
        private String thumbnailImage;
    }

    @Data
    public static class KakaoAccountDto {
        @JsonProperty("profile_needs_agreement")
        private boolean profileNeedsAgreement;
        private ProfileDto profile;
        @JsonProperty("has_email")
        private boolean hasEmail;
        @JsonProperty("email_needs_agreement")
        private boolean emailNeedsAgreement;
        @JsonProperty("is_email_valid")
        private boolean isEmailValid;
        @JsonProperty("is_email_verified")
        private boolean isEmailVerified;
        private String email;
        @JsonProperty("has_age_range")
        private boolean hasAgeRange;
        @JsonProperty("age_range_needs_agreement")
        private boolean ageRangeNeedsAgreement;
        @JsonProperty("age_range")
        private String ageRange;
        @JsonProperty("has_birthday")
        private boolean hasBirthday;
        @JsonProperty("birthday_needs_agreement")
        private boolean birthdayNeedsAgreement;
        private String birthday;
        @JsonProperty("birthday_type")
        private String birthdayType;
        @JsonProperty("has_gender")
        private boolean hasGender;
        @JsonProperty("gender_needs_agreement")
        private boolean genderNeedsAgreement;
        private String gender;
    }

    @Data
    public static class ProfileDto {
        private String nickname;
//        @JsonProperty("thumbnail_image_url")
//        private String thumbnailImageUrl;
//        @JsonProperty("profile_image_url")
//        private String profileImageUrl;
//        @JsonProperty("is_default_image")
//        private boolean isDefaultImage;
    }
}
