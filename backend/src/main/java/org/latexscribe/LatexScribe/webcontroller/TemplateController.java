package org.latexscribe.LatexScribe.webcontroller;

import lombok.RequiredArgsConstructor;
import org.latexscribe.LatexScribe.domain.enums.TemplateCategory;
import org.latexscribe.LatexScribe.domain.model.DocumentTemplate;
import org.latexscribe.LatexScribe.domain.model.User;
import org.latexscribe.LatexScribe.service.ITemplateService;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/templates")
public class TemplateController {
    private final ITemplateService templateService;

    @GetMapping
    public List<DocumentTemplate> listTemplates(@RequestParam(required = false) TemplateCategory category) {
        if (category != null) {
            return templateService.listAllByCategory(category);
        }
        return templateService.listAll();
    }

//    @GetMapping("/my_templates")
//    public List<DocumentTemplate> listAllByUser(User user) {
//        return templateService.listAllByUser(user);
//    }

    @GetMapping("/{id}")
    public DocumentTemplate getById(@PathVariable Long id) {
        Optional<DocumentTemplate> template = templateService.findById(id);
        if (template.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "template not found"
            );
        }
        return template.get();
    }
}
