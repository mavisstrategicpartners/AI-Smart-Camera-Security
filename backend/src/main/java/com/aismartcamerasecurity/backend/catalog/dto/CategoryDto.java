package com.aismartcamerasecurity.backend.catalog.dto;

import com.aismartcamerasecurity.backend.catalog.Category;

public record CategoryDto(Long id, String key, String label, int order) {
    public static CategoryDto from(Category c) {
        return new CategoryDto(c.getId(), c.getKey(), c.getLabel(), c.getSortOrder());
    }
}


