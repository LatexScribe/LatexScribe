package org.latexscribe.LatexScribe.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.latexscribe.LatexScribe.domain.enums.TemplateCategory;
import org.latexscribe.LatexScribe.domain.model.DocumentTemplate;
import org.latexscribe.LatexScribe.repository.TemplateRepository;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

class JsonTemplate {
    public String name;
    public String author;
    public String description;
    public String license;
    public String path;
}

class JsonCategory {
    public List<JsonTemplate> templates;
}

class JsonTemplates {
    public Map<String, JsonCategory> categories;
}

@Component
@RequiredArgsConstructor
public class InitializeTemplatesBean {
    private static final Logger LOGGER
            = Logger.getLogger(String.valueOf(InitializeTemplatesBean.class));

    private final TemplateRepository repository;

    @PostConstruct
    public void init() throws IOException, URISyntaxException {
        LOGGER.info("Static templates initializing...");

        ObjectMapper mapper = new ObjectMapper();
        TypeReference<JsonTemplates> typeReference = new TypeReference<>(){};
        InputStream inputStream = TypeReference.class.getResourceAsStream("/public/templates/index.json");
        JsonTemplates templates = mapper.readValue(inputStream, typeReference);

        repository.deleteAll();
        for (var entry : templates.categories.entrySet()) {
            var category_name = entry.getKey();
            var category_enum = TemplateCategory.valueOf(category_name);
            var category = entry.getValue();

            for (var template : category.templates) {
                var url = this.getClass().getClassLoader().getResource(String.format("public/templates/%s/%s/source.tex", category_name, template.path));
                assert url != null;
                var content = Files.readAllBytes(Paths.get(url.toURI()));

                repository.save(
                    DocumentTemplate
                        .builder()
                        .name(template.name)
                        .size((long) content.length)
                        .content(content)
                        .category(category_enum)
                        .author(template.author)
                        .codeName(String.format("%s/%s", category_name, template.path))
                        .description(template.description)
                        .license(template.license)
                        .build()
                );
            }
        }

        repository.flush();

        LOGGER.info("Static templates initialized!");
    }
}
